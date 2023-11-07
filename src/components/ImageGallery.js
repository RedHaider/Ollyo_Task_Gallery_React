import React, { useState } from 'react';
import './ImageGallery.css';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';

const ImageGallery = ({ images, setImages }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const toggleImageSelection = (image) => {
    const imageIndex = selectedImages.findIndex((selectedImage) => selectedImage.id === image.id);

    if (imageIndex === -1) {
      // Image is not selected, add it to the selection
      setSelectedImages([...selectedImages, image]);
    } else {
      // Image is selected, remove it from the selection
      const updatedSelection = [...selectedImages];
      updatedSelection.splice(imageIndex, 1);
      setSelectedImages(updatedSelection);
    }
  };
  function handleOnDragEnd(result) {
    if (!result.destination) return; // Item was not dropped in a valid position
  
    // Reorder your images based on the result
    const reorderedImages = Array.from(images);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);
  
    // Update your state or call a function to update the state
    setImages(reorderedImages);
  }
  

  const deleteSelectedImages = () => {
     console.log('Delete function called'); 
    // Filter out the selected images from the images list
    const updatedImages = images.filter((image) => !selectedImages.some((selectedImage) => selectedImage.id === image.id));
    console.log('Updated images:', updatedImages);

    setSelectedImages([]);
    setIsDeleteMode(false);

    setImages(updatedImages);

  };

  return (
    <div>
     <DragDropContext onDragEnd={handleOnDragEnd}>
     <Droppable droppableId="image-gallery">
      {(provided)=>(
      <div className="image-gallery" {...provided.droppableProps} ref={provided.innerRef}>
        {images.map((image,index) => (
          <Draggable key={image.id} draggableId={image.id} index={index}>
            {(provided)=>(
          <div key={image.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`image-item ${image.isFeatured ? 'featured' : ''} ${selectedImages.some((selectedImage) => selectedImage.id === image.id) ? 'selected' : ''}`}>
            <div className={selectedImages.some((selectedImage)=> selectedImage.id === image.id)?"show-overlay":"image-overlay"}>
              <input
                type="checkbox"
                checked={selectedImages.some((selectedImage) => selectedImage.id === image.id)}
                onChange={() => toggleImageSelection(image)}
                className="checkbox"
              />
            </div>
            <img
              src={`/images/${image.ImageName}`}
              alt={`Image ${image.id}`}
            />
          </div>
          )}
          </Draggable>
        ))}
      </div>
      )}
      </Droppable>
      </DragDropContext>
      <div className="controls">
        <button
          onClick={() => setIsDeleteMode(!isDeleteMode)}
          className={`delete-button ${isDeleteMode ? 'active' : ''}`}>
          Delete
        </button>
        {isDeleteMode && (
          <button onClick={deleteSelectedImages} className="confirm-delete-button">
            Confirm Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
