import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import ImageGallery from './components/ImageGallery';
import { useState } from 'react';


function App() {
  const [images, setImages] = useState([
    { id: '1', ImageName: 'image-1.webp', checked: false , isFeatured: true},
    { id: '2', ImageName: 'image-2.webp', checked: false },
    { id: '3', ImageName: 'image-3.webp', checked: false },
    { id: '4', ImageName: 'image-4.webp', checked: false },
    { id: '5', ImageName: 'image-5.webp', checked: false },
    { id: '6', ImageName: 'image-6.webp', checked: false },
    { id: '7', ImageName: 'image-7.webp', checked: false },
    { id: '8', ImageName: 'image-8.webp', checked: false },
    { id: '9', ImageName: 'image-9.webp', checked: false },
    { id: '10', ImageName: 'image-10.jpeg', checked: false },
    { id: '11', ImageName: 'image-11.jpeg', checked: false },
  ]);
  


  return (
    <div className="App">
      <Header />
      <ImageGallery images={images} setImages={setImages} />      
    </div>
  );
}

export default App;
