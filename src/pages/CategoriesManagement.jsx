import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Package, Pencil, Plus, ShoppingBag } from 'lucide-react';
import { getCategories } from '../api/categoryApi';

const getCategoryImageUrl = (image) => {
  if (!image) return '';
  try {
    const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
    const mediaBase = new URL(apiUrl, window.location.origin);
    mediaBase.pathname = mediaBase.pathname.replace(/\/api\/?$/, '/');
    return new URL(image, mediaBase).toString();
  } catch {
    return image;
  }
};

const CategoryCard = ({ category, onEdit }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = getCategoryImageUrl(category.image);

  return (
    <article className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
      <div className="p-4 pb-14">
        <h2 className="truncate text-[14px] font-semibold text-slate-800">{category.name}</h2>
        {category.description ? (
          <p className="mt-1 line-clamp-2 min-h-10 text-[12px] leading-5 text-slate-500">
            {category.description}
          </p>
        ) : (
          <p className="mt-1 min-h-10 text-[12px] leading-5 text-slate-400">No description provided.</p>
        )}
        {category.slug && (
          <p className="mt-3 truncate border-t border-slate-100 pt-3 pr-10 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            {category.slug}
          </p>
        )}
        <button
          type="button"
          onClick={() => onEdit(category.id)}
          aria-label={`Edit ${category.name}`}
          title="Edit category"
          className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-[#F0FAFB] hover:text-[#008FB8]"
        >
          <Pencil size={16} />
        </button>
      </div>
    </article>
  );
};

const CategoriesManagement = () => {
  const navigate = useNavigate();
  const [categoryState, setCategoryState] = useState({ categories: [], loading: true, error: '' });

  const loadCategories = useCallback(() => {
    setCategoryState((currentState) => ({ ...currentState, loading: true, error: '' }));
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
          error: error.response?.data?.message || error.message || 'Could not load categories.',
        });
      });
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <main className="mx-auto max-w-[1200px] space-y-6 pb-10">
      <header className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[#00BAF2]">
            <ShoppingBag size={18} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Catalog</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Category Management</h1>
            {!categoryState.loading && !categoryState.error && (
              <span className="rounded-full bg-[#F0FAFB] px-3 py-1 text-[11px] font-semibold text-[#008FB8]">
                {categoryState.categories.length} {categoryState.categories.length === 1 ? 'category' : 'categories'}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">View all active categories in your catalog.</p>
        </div>
        <div className="flex shrink-0 items-center gap-3 self-start sm:self-center">
          <button
            type="button"
            onClick={() => navigate('/categories/add')}
            className="inline-flex items-center gap-2 rounded-lg bg-[#00BAF2] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#00a3d6]"
          >
            <Plus size={16} /> Add category
          </button>
        </div>
      </header>

      {categoryState.error ? (
        <div role="alert" className="flex flex-col gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-[13px] text-rose-700 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2">
            <AlertCircle size={17} className="mt-0.5 shrink-0" />
            <span>Categories could not be loaded: {categoryState.error}</span>
          </div>
          <button
            type="button"
            onClick={loadCategories}
            disabled={categoryState.loading}
            className="self-start font-semibold underline underline-offset-2 sm:self-auto"
          >
            Retry
          </button>
        </div>
      ) : categoryState.loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-[13px] text-slate-500">
          Loading categories...
        </div>
      ) : categoryState.categories.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-[13px] text-slate-500">
          No active categories were returned by the backend.
        </div>
      ) : (
        <section aria-label="Categories" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryState.categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={(categoryId) => navigate(`/categories/${categoryId}/edit`)}
              />
          ))}
        </section>
      )}
    </main>
  );
};

export default CategoriesManagement;
