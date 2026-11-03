import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle, Image, Package, Plus, Search, ShoppingBag, Trash2, X,
} from 'lucide-react';
import { getCategories } from '../api/categoryApi';

const STORAGE_KEY = 'astrology-admin-products';

const emptyProduct = {
  name: '',
  categoryId: '',
  price: '',
  stock: '',
  description: '',
  imageUrl: '',
};

const ProductField = ({ label, children }) => (
  <div className="space-y-2">
    <label className="block text-[12px] font-semibold text-slate-600">{label}</label>
    {children}
  </div>
);

const inputClassName = 'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[13px] text-slate-700 outline-none transition focus:border-[#00BAF2] focus:ring-2 focus:ring-[#00BAF2]/10';

const getCategoryImageUrl = (image) => {
  if (!image) return '';
  try {
    const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
    // API URLs often include `/api`; media files are served from the API host root.
    const mediaBase = new URL(apiUrl, window.location.origin);
    mediaBase.pathname = mediaBase.pathname.replace(/\/api\/?$/, '/');
    return new URL(image, mediaBase).toString();
  } catch {
    return image;
  }
};

const CategoryCard = ({ category }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = getCategoryImageUrl(category.image);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {imageUrl && !imageFailed ? (
        <img
          src={imageUrl}
          alt={category.name}
          className="block h-36 w-full bg-slate-50 object-fill"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#F0FAFB] to-slate-100 text-[#00A3D6]">
          <Package size={32} strokeWidth={1.5} />
        </div>
      )}
      <div className="p-2 sm:p-4">
        <h3 className="truncate text-[14px] font-semibold text-slate-800">{category.name}</h3>
        {category.description ? (
          <p className="line-clamp-2 min-h-10 text-[12px] leading-5 text-slate-500">
            {category.description}
          </p>
        ) : (
          <p className="mt-1 min-h-10 text-[12px] leading-5 text-slate-400">No description provided.</p>
        )}
        {category.slug && (
          <p className="mt-3 truncate border-t border-slate-100 pt-3 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            {category.slug}
          </p>
        )}
      </div>
    </article>
  );
};

const loadCatalog = () => {
  try {
    const savedProducts = window.localStorage.getItem(STORAGE_KEY);
    if (!savedProducts) return { products: [], storageError: '' };

    const parsedProducts = JSON.parse(savedProducts);
    if (!Array.isArray(parsedProducts)) {
      throw new Error('Saved product data is not a list.');
    }

    return { products: parsedProducts, storageError: '' };
  } catch {
    return {
      products: [],
      storageError: 'Products could not be loaded from this browser. Check your browser storage and refresh.',
    };
  }
};

const ProductsManagement = () => {
  const [catalog, setCatalog] = useState(loadCatalog);
  const [form, setForm] = useState(emptyProduct);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState('');
  const [categoryState, setCategoryState] = useState({
    categories: [],
    loading: true,
    error: '',
  });
  const { products, storageError } = catalog;

  const loadCategories = useCallback(() => {
    getCategories()
      .then((response) => {
        if (!response?.success || !Array.isArray(response.data)) {
          throw new Error(response?.message || 'The categories response was invalid.');
        }
        setCategoryState({ categories: response.data, loading: false, error: '' });
      })
      .catch((error) => {
        setCategoryState({
          categories: [],
          loading: false,
          error: error.response?.data?.message || error.message || 'Could not load product categories.',
        });
      });
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(query)
    );
  }, [products, search]);

  const saveProducts = (nextProducts) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
      setCatalog({ products: nextProducts, storageError: '' });
      return true;
    } catch {
      setCatalog((currentCatalog) => ({
        ...currentCatalog,
        storageError: 'Changes could not be saved to this browser. Check available storage and try again.',
      }));
      return false;
    }
  };

  const updateForm = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setFormError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!form.name.trim() || !form.categoryId || !form.price || !form.stock) {
      setFormError('Enter a product name, choose a category, and provide price and stock quantity.');
      return;
    }
    if (!Number.isFinite(price) || price < 0 || !Number.isInteger(stock) || stock < 0) {
      setFormError('Price must be zero or more, and stock must be a whole number zero or more.');
      return;
    }

    const category = categoryState.categories.find(
      (item) => String(item.id) === String(form.categoryId)
    );
    if (!category) {
      setFormError('Choose a valid category from the list.');
      return;
    }

    const product = {
      ...form,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: form.name.trim(),
      categoryId: category.id,
      category: category.name,
      price,
      stock,
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      createdAt: new Date().toISOString(),
    };

    if (saveProducts([product, ...products])) {
      setForm(emptyProduct);
      setFormError('');
      setShowForm(false);
    }
  };

  const handleDelete = (productId) => {
    saveProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="mx-auto max-w-[1200px] space-y-6 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[#00BAF2]">
            <ShoppingBag size={18} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Catalog</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">Add and manage products in your catalog.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowForm(true);
            setFormError('');
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00BAF2] px-5 py-3 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#00a3d6]"
        >
          <Plus size={17} />
          Add product
        </button>
      </div>

      {storageError && (
        <div role="alert" className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-4 text-[13px] text-rose-700">
          <AlertCircle size={17} className="mt-0.5 shrink-0" />
          {storageError}
        </div>
      )}

      {categoryState.error && (
        <div role="alert" className="flex flex-col gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-[13px] text-rose-700 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2">
            <AlertCircle size={17} className="mt-0.5 shrink-0" />
            <span>Categories could not be loaded: {categoryState.error}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setCategoryState((currentState) => ({
                ...currentState,
                loading: true,
                error: '',
              }));
              loadCategories();
            }}
            disabled={categoryState.loading}
            className="self-start font-semibold text-rose-700 underline underline-offset-2 sm:self-auto"
          >
            Retry
          </button>
        </div>
      )}

      {showForm && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Add a product</h2>
              <p className="mt-1 text-[13px] text-slate-500">Enter the details to add it to your catalog.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormError('');
              }}
              aria-label="Close product form"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <ProductField label="Product name *">
                <input
                  autoFocus
                  required
                  value={form.name}
                  onChange={(event) => updateForm('name', event.target.value)}
                  placeholder="e.g. 7 Chakra Bracelet"
                  className={inputClassName}
                />
              </ProductField>
              <ProductField label="Category *">
                <select
                  required
                  value={form.categoryId}
                  disabled={categoryState.loading || categoryState.categories.length === 0}
                  onChange={(event) => updateForm('categoryId', event.target.value)}
                  className={inputClassName}
                >
                  <option value="">
                    {categoryState.loading ? 'Loading categories...' : 'Select a category'}
                  </option>
                  {categoryState.categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                {!categoryState.loading && !categoryState.error && categoryState.categories.length === 0 && (
                  <p className="text-[11px] text-amber-700">No active categories are available.</p>
                )}
              </ProductField>
              <ProductField label="Price *">
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-slate-400">₹</span>
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(event) => updateForm('price', event.target.value)}
                    placeholder="0.00"
                    className={`${inputClassName} pl-9`}
                  />
                </div>
              </ProductField>
              <ProductField label="Stock quantity *">
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(event) => updateForm('stock', event.target.value)}
                  placeholder="0"
                  className={inputClassName}
                />
              </ProductField>
              <div className="md:col-span-2">
                <ProductField label="Image URL (optional)">
                  <div className="relative">
                    <Image size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={(event) => updateForm('imageUrl', event.target.value)}
                      placeholder="https://example.com/product-image.jpg"
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                </ProductField>
              </div>
              <div className="md:col-span-2">
                <ProductField label="Description (optional)">
                  <textarea
                    rows="3"
                    value={form.description}
                    onChange={(event) => updateForm('description', event.target.value)}
                    placeholder="Add a short description of this product"
                    className={`${inputClassName} resize-y`}
                  />
                </ProductField>
              </div>
            </div>

            {formError && <p role="alert" className="text-[13px] font-medium text-rose-600">{formError}</p>}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setForm(emptyProduct);
                  setFormError('');
                }}
                className="rounded-lg border border-slate-200 px-5 py-2.5 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00BAF2] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#00a3d6]"
              >
                <Plus size={16} />
                Save product
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Product categories</h2>
            <p className="mt-1 text-[13px] text-slate-500">All active categories from your catalog.</p>
          </div>
          {!categoryState.loading && !categoryState.error && (
            <span className="shrink-0 rounded-full bg-[#F0FAFB] px-3 py-1 text-[11px] font-semibold text-[#008FB8]">
              {categoryState.categories.length} {categoryState.categories.length === 1 ? 'category' : 'categories'}
            </span>
          )}
        </div>
        {categoryState.loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-[13px] text-slate-500">
            Loading categories...
          </div>
        ) : categoryState.error ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-[13px] text-slate-500">
            Categories are unavailable. Use Retry above to try again.
          </div>
        ) : categoryState.categories.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-[13px] text-slate-500">
            No active categories were returned by the backend.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryState.categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-semibold text-slate-900">Product catalog</h2>
            <p className="mt-1 text-[12px] text-slate-500">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              aria-label="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className={`${inputClassName} py-2.5 pl-10`}
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <div className="mb-4 rounded-2xl bg-slate-50 p-4 text-slate-400">
              <Package size={28} />
            </div>
            <h3 className="font-semibold text-slate-800">
              {search ? 'No matching products' : 'No products yet'}
            </h3>
            <p className="mt-1 max-w-sm text-[13px] text-slate-500">
              {search ? 'Try another search term.' : 'Add your first product to start building your catalog.'}
            </p>
            {!search && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold text-[#008FB8] transition hover:bg-[#F0FAFB]"
              >
                <Plus size={16} />
                Add your first product
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-slate-50/80">
                <tr className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-3">Product</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Stock</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t border-slate-100 transition hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt=""
                            className="h-11 w-11 rounded-lg border border-slate-100 object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F0FAFB] text-[#00A3D6]">
                            <Package size={19} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-semibold text-slate-800">{product.name}</p>
                          {product.description && (
                            <p className="mt-0.5 max-w-xs truncate text-[11px] text-slate-400">{product.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{product.category}</span>
                    </td>
                    <td className="px-5 py-4 text-[13px] font-semibold text-slate-700">
                      ₹{Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-[13px] text-slate-600">{product.stock}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        aria-label={`Delete ${product.name}`}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <p className="text-[11px] text-slate-400">Products are saved in this browser and are not synced to a server.</p>
    </div>
  );
};

export default ProductsManagement;
