// App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Modal from './components/Modal';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductSimilar from './components/ProductSimilar';

function App() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <ProductList setSelectedProductId={setSelectedProductId} setIsModalOpen={setIsModalOpen} />
      {isModalOpen && selectedProductId && (
        <Modal onClose={() => {
          setIsModalOpen(false);
        }}>
          <Button variant="contained" color="primary" sx={{'marginRight': 2}}>
            <Link to={`/product/${selectedProductId}/detail`}>Detail</Link>
          </Button>
          <Button variant="contained" color="primary">
            <Link to={`/product/${selectedProductId}/similar`}>Podobné</Link>
          </Button>
          <Routes>
            <Route path="/product/:id/detail" element={<ProductDetail productId={selectedProductId} />} />
            <Route path="/product/:id/similar" element={<ProductSimilar productId={selectedProductId} />} />
          </Routes>
        </Modal>
      )}
    </Router>
  );
}


export default App;
