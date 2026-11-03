import { useCallback, useEffect, useState } from 'react';
import { AlertCircle, Layers, Package } from 'lucide-react';
import { getAllSubcategories } from '../api/subcategoryApi';

const getImageUrl = (image) => {
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

const SubcategoryCard = ({ subcategory, categoryName }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = getImageUrl(subcategory.image);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {imageUrl && !imageFailed ? (
        <img src={imageUrl} alt={subcategory.name} className="block h-36 w-full bg-slate-50 object-fill" loading="lazy" onError={() => setImageFailed(true)} />
      ) : (
        <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#F0FAFB] to-slate-100 text-[#00A3D6]"><Package size={32} strokeWidth={1.5} /></div>
      )}
      <div className="p-4">
        <p className="mb-2 inline-flex rounded-full bg-[#F0FAFB] px-2.5 py-1 text-[11px] font-semibold text-[#008FB8]">
          Category: {categoryName}
        </p>
        <h2 className="font-semibold text-slate-800">{subcategory.name}</h2>
        {subcategory.description && <p className="mt-1 text-[12px] leading-5 text-slate-500">{subcategory.description}</p>}
        {subcategory.slug && <p className="mt-3 border-t border-slate-100 pt-3 text-[10px] font-medium uppercase tracking-wide text-slate-400">{subcategory.slug}</p>}
      </div>
    </article>
  );
};

const SubcategoriesManagement = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSubcategories = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const subcategoryResponse = await getAllSubcategories();
      if (!subcategoryResponse?.success || !Array.isArray(subcategoryResponse.data)) {
        throw new Error(subcategoryResponse?.message || 'The subcategories response was invalid.');
      }
      setSubcategories(subcategoryResponse.data);
    } catch (loadError) {
      setError(loadError.response?.data?.message || loadError.message || 'Could not load subcategories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSubcategories();
  }, [loadSubcategories]);

  return (
    <main className="mx-auto max-w-[1200px] space-y-6 pb-10">
      <header className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[#00BAF2]">
            <Layers size={18} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Catalog</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Subcategories Management</h1>
          <p className="mt-1 text-sm text-slate-500">View all active subcategories across your categories.</p>
        </div>
        {!loading && !error && (
          <span className="shrink-0 self-start rounded-full bg-[#F0FAFB] px-3 py-1 text-[11px] font-semibold text-[#008FB8] sm:self-center">
            {subcategories.length} {subcategories.length === 1 ? 'subcategory' : 'subcategories'}
          </span>
        )}
      </header>

      {error ? (
        <div role="alert" className="flex flex-col gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-[13px] text-rose-700 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2"><AlertCircle size={17} className="mt-0.5 shrink-0" /><span>{error}</span></div>
          <button type="button" onClick={loadSubcategories} disabled={loading} className="self-start font-semibold underline underline-offset-2 sm:self-auto">Retry</button>
        </div>
      ) : loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-[13px] text-slate-500">Loading subcategories...</div>
      ) : subcategories.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-[13px] text-slate-500">No active subcategories were returned by the backend.</div>
      ) : (
        <section aria-label="All subcategories" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subcategories.map((subcategory) => (
            <SubcategoryCard
              key={subcategory.id}
              subcategory={subcategory}
              categoryName={
                (typeof subcategory.category === 'string' ? subcategory.category : subcategory.category?.name)
                || subcategory.categoryName
                || `Category #${subcategory.categoryId}`
              }
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default SubcategoriesManagement;
