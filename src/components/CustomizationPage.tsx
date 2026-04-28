import React, { useState } from 'react';
import { LogOut, Image, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

interface PhotoSlide {
  image: string;
  title: string;
  caption: string;
}

interface CarouselSlide {
  title: string;
  description: string;
  date: string;
  participants: string;
}

interface CustomizationPageProps {
  photoSlides: PhotoSlide[];
  carouselSlides: CarouselSlide[];
  onLogout: () => void;
  onUpdate: (photoSlides: PhotoSlide[], carouselSlides: CarouselSlide[]) => void;
}

export const CustomizationPage: React.FC<CustomizationPageProps> = ({
  photoSlides: initialPhotoSlides,
  carouselSlides: initialCarouselSlides,
  onLogout,
  onUpdate,
}) => {
  const [photoSlides, setPhotoSlides] = useState(initialPhotoSlides);
  const [carouselSlides, setCarouselSlides] = useState(initialCarouselSlides);
  const [activeTab, setActiveTab] = useState<'photos' | 'carousel'>('photos');
  const [editingPhotoIndex, setEditingPhotoIndex] = useState<number | null>(null);
  const [editingCarouselIndex, setEditingCarouselIndex] = useState<number | null>(null);
  const [savedMessage, setSavedMessage] = useState('');

  const handleSavePhoto = (index: number, photo: PhotoSlide) => {
    const newSlides = [...photoSlides];
    newSlides[index] = photo;
    setPhotoSlides(newSlides);
    setEditingPhotoIndex(null);
  };

  const handleAddPhoto = () => {
    setPhotoSlides([
      ...photoSlides,
      {
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
        title: 'New Event',
        caption: 'Add your event description here',
      },
    ]);
  };

  const handleDeletePhoto = (index: number) => {
    setPhotoSlides(photoSlides.filter((_, i) => i !== index));
  };

  const handleSaveCarousel = (index: number, slide: CarouselSlide) => {
    const newSlides = [...carouselSlides];
    newSlides[index] = slide;
    setCarouselSlides(newSlides);
    setEditingCarouselIndex(null);
  };

  const handleAddCarousel = () => {
    setCarouselSlides([
      ...carouselSlides,
      {
        title: 'New Program',
        description: 'Add your program description here',
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        participants: '0+ participants',
      },
    ]);
  };

  const handleDeleteCarousel = (index: number) => {
    setCarouselSlides(carouselSlides.filter((_, i) => i !== index));
  };

  const handleSaveAll = () => {
    onUpdate(photoSlides, carouselSlides);
    setSavedMessage('Changes saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 border-b-4 border-purple-400 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">GAD Customization Panel</h1>
            <p className="text-sm text-purple-100 mt-1">Manage content and customize your dashboard</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Save Notification */}
        {savedMessage && (
          <div className="mb-6 p-4 bg-green-100 border-2 border-green-500 text-green-700 rounded-lg flex items-center justify-between animate-in fade-in">
            <span className="font-semibold">✓ {savedMessage}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-6 py-3 font-semibold rounded-lg transition-all ${
              activeTab === 'photos'
                ? 'bg-purple-700 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400'
            }`}
          >
            <Image className="w-5 h-5 inline mr-2" />
            Photo Gallery
          </button>
          <button
            onClick={() => setActiveTab('carousel')}
            className={`px-6 py-3 font-semibold rounded-lg transition-all ${
              activeTab === 'carousel'
                ? 'bg-purple-700 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400'
            }`}
          >
            <Edit2 className="w-5 h-5 inline mr-2" />
            Featured Programs
          </button>
        </div>

        {/* Photo Gallery Tab */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Photo Carousel</h2>
              <button
                onClick={handleAddPhoto}
                className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Photo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {photoSlides.map((photo, index) => (
                <div key={index} className="bg-white rounded-lg border-2 border-gray-300 overflow-hidden shadow-md">
                  {editingPhotoIndex === index ? (
                    <PhotoEditForm
                      photo={photo}
                      onSave={(updated) => handleSavePhoto(index, updated)}
                      onCancel={() => setEditingPhotoIndex(null)}
                    />
                  ) : (
                    <>
                      <img src={photo.image} alt={photo.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{photo.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{photo.caption}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingPhotoIndex(index)}
                            className="flex-1 flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-3 py-2 rounded font-semibold transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePhoto(index)}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded font-semibold transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Programs Tab */}
        {activeTab === 'carousel' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Featured Programs</h2>
              <button
                onClick={handleAddCarousel}
                className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Program
              </button>
            </div>

            <div className="space-y-4">
              {carouselSlides.map((slide, index) => (
                <div key={index} className="bg-white rounded-lg border-2 border-gray-300 p-6 shadow-md">
                  {editingCarouselIndex === index ? (
                    <CarouselEditForm
                      slide={slide}
                      onSave={(updated) => handleSaveCarousel(index, updated)}
                      onCancel={() => setEditingCarouselIndex(null)}
                    />
                  ) : (
                    <>
                      <div className="mb-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{slide.title}</h3>
                        <p className="text-gray-700 mb-3">{slide.description}</p>
                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                          <span>📅 {slide.date}</span>
                          <span>👥 {slide.participants}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingCarouselIndex(index)}
                          className="flex-1 flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-3 py-2 rounded font-semibold transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCarousel(index)}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded font-semibold transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save All Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-800 hover:to-purple-900 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg text-lg"
          >
            <Save className="w-6 h-6" />
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Photo Edit Form Component
interface PhotoEditFormProps {
  photo: PhotoSlide;
  onSave: (photo: PhotoSlide) => void;
  onCancel: () => void;
}

const PhotoEditForm: React.FC<PhotoEditFormProps> = ({ photo, onSave, onCancel }) => {
  const [formData, setFormData] = useState(photo);

  return (
    <div className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-700"
        />
        <p className="text-xs text-gray-500 mt-1">Paste image URL from Unsplash or other sources</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-700"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Caption</label>
        <textarea
          value={formData.caption}
          onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
          className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-700 h-20 resize-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onSave(formData)}
          className="flex-1 flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-3 py-2 rounded font-semibold transition-all"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded font-semibold transition-all"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
};

// Carousel Edit Form Component
interface CarouselEditFormProps {
  slide: CarouselSlide;
  onSave: (slide: CarouselSlide) => void;
  onCancel: () => void;
}

const CarouselEditForm: React.FC<CarouselEditFormProps> = ({ slide, onSave, onCancel }) => {
  const [formData, setFormData] = useState(slide);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Program Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-700"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-700 h-20 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-700"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Participants</label>
          <input
            type="text"
            value={formData.participants}
            onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
            className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-700"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onSave(formData)}
          className="flex-1 flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-3 py-2 rounded font-semibold transition-all"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded font-semibold transition-all"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
};
