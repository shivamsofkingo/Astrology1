import { useEffect, useState } from 'react';
import { ArrowLeft, Image as ImageIcon, Save, UploadCloud, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories } from '../api/categoryApi';
import { createSubcategory, getAllSubcategories, updateSubcategory } from '../api/subcategoryApi';

const fieldClassName = 'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[13px] text-slate-700 outline-none transition focus:border-[#00BAF2] focus:ring-2 focus:ring-[#00BAF2]/10';
const getImageUrl = (image) => {
  if (!image) return '';
  try {
    const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
    const mediaBase = new URL(apiUrl, window.location.origin);
    mediaBase.pathname = mediaBase.pathname.replace(/\/api\/?$/, '/');
    return new URL(image, mediaBase).toString();
  } catch { return image; }
};

const AddSubcategory = () => {
  const navigate = useNavigate();
  const { subcategoryId } = useParams();
  const isEditing = Boolean(subcategoryId);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [removeImage, setRemoveImage] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  useEffect(() => {
    let active = true;
    Promise.all([getCategories(), isEditing ? getAllSubcategories() : Promise.resolve(null)]).then(([response, subcategoryResponse]) => {
      if (!response?.success || !Array.isArray(response.data)) throw new Error(response?.message || 'Could not load categories.');
      if (active) {
        setCategories(response.data);
        const subcategory = subcategoryResponse?.data?.find((item) => String(item.id) === String(subcategoryId));
        if (isEditing && !subcategory) throw new Error('Subcategory not found.');
        setCategoryId(subcategory ? String(subcategory.categoryId) : response.data.length ? String(response.data[0].id) : '');
        if (subcategory) {
          setName(subcategory.name || '');
          setDescription(subcategory.description || '');
          setCurrentImage(subcategory.image || '');
        }
      }
    }).catch((loadError) => {
      if (active) setError(loadError.response?.data?.message || loadError.message || 'Could not load categories.');
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [isEditing, subcategoryId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = new FormData();
      payload.append('name', name.trim());
      payload.append('description', description.trim());
      payload.append('categoryId', categoryId);
      if (image) payload.append('image', image);
      if (removeImage) payload.append('removeImage', 'true');
      if (isEditing) await updateSubcategory(subcategoryId, payload);
      else await createSubcategory(payload);
      navigate('/subcategories', { replace: true });
    } catch (submitError) {
      setError(submitError.response?.data?.message || submitError.message || 'Could not create subcategory.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-[900px] space-y-5 pb-10">
      <button type="button" onClick={() => navigate('/subcategories')} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900">
        <ArrowLeft size={16} /> Back to subcategories
      </button>
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00A3D6]">Category Management</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{isEditing ? 'Edit Subcategory' : 'Add New Subcategory'}</h1>
        </div>
        {loading ? <p className="text-[13px] text-slate-500">Loading categories...</p> : categories.length === 0 ? (
          <p className="text-[13px] text-slate-500">Create an active category before adding a subcategory.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block space-y-2 text-[12px] font-semibold text-slate-600">Parent category <span className="text-rose-500">*</span>
              <select required value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className={fieldClassName}>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
            </label>
            <label className="block space-y-2 text-[12px] font-semibold text-slate-600">Subcategory name <span className="text-rose-500">*</span>
              <input required maxLength={255} value={name} onChange={(event) => { setName(event.target.value); setError(''); }} placeholder="e.g. Meditation Cushions" className={fieldClassName} />
            </label>
            <label className="block space-y-2 text-[12px] font-semibold text-slate-600">Description
              <textarea rows={4} maxLength={5000} value={description} onChange={(event) => { setDescription(event.target.value); setError(''); }} placeholder="Add a short description" className={`${fieldClassName} resize-y`} />
            </label>
            <div className="space-y-2">
              <span className="block text-[12px] font-semibold text-slate-600">Subcategory image</span>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-[#00BAF2] hover:bg-[#F0FAFB]">
                <UploadCloud size={24} className="text-[#00A3D6]" />
                <span className="text-[13px] font-semibold text-slate-700">Choose an image to upload</span>
                <span className="text-[11px] text-slate-500">JPEG, PNG, or WEBP, up to 10 MB</span>
                <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => {
                  const selectedImage = event.target.files?.[0] || null;
                  if (selectedImage && !['image/jpeg', 'image/png', 'image/webp'].includes(selectedImage.type)) {
                    setImage(null);
                    setImagePreview('');
                    setError('Choose a JPEG, PNG, or WEBP image.');
                    event.target.value = '';
                    return;
                  }
                  if (selectedImage && selectedImage.size > 10 * 1024 * 1024) {
                    setImage(null);
                    setImagePreview('');
                    setError('The image must be 10 MB or smaller.');
                    event.target.value = '';
                    return;
                  }
                  setImage(selectedImage);
                  setImagePreview(selectedImage ? URL.createObjectURL(selectedImage) : '');
                  setRemoveImage(false);
                  setError('');
                }} />
              </label>
              {(image || (currentImage && !removeImage)) && (
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                  {image ? <img src={imagePreview} alt="Subcategory preview" className="h-16 w-16 rounded-md object-cover" /> : currentImage && !removeImage ? <img src={getImageUrl(currentImage)} alt="Subcategory preview" className="h-16 w-16 rounded-md object-cover" /> : <ImageIcon size={24} className="text-slate-400" />}
                  <span className="min-w-0 flex-1 truncate text-[12px] text-slate-600">{image?.name || 'Current image'}</span>
                  <button type="button" onClick={() => {
                    if (image) { setImage(null); setImagePreview(''); }
                    else setRemoveImage(true);
                  }} aria-label="Remove subcategory image" className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={16} /></button>
                </div>
              )}
            </div>
            {error && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-[13px] text-rose-700">{error}</p>}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => navigate('/subcategories')} className="rounded-lg border border-slate-200 px-5 py-2.5 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={saving || !categoryId} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00BAF2] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#00a3d6] disabled:cursor-not-allowed disabled:opacity-60">
                <Save size={16} /> {saving ? (isEditing ? 'Saving...' : 'Adding...') : (isEditing ? 'Save changes' : 'Add subcategory')}
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

export default AddSubcategory;
