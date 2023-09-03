import React from 'react';
import { Card, CardContent, CardMedia, Typography, List, ListItem, CircularProgress } from '@mui/material';
import useFetch from '../hooks/useFetchAllProducts';

type ProductDetailProps = {
  productId: string;
};

type ProductDetailData = {
  name: string;
  photo: string;
  description: string;
  price: string;
  parameters: { name: string; value: string }[];
};

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [product, loading] = useFetch<ProductDetailData>(`https://favi-endpoint-vunqxcib5a-lm.a.run.app/products/${productId}`);

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <div>Omlouváme se, nemůžeme najít informace o produktu :(</div>;
  }

  return (
    <Card sx={{'marginTop': 4}}>
      <CardMedia component="img" height="130" image={product.photo} alt={product.name} />
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">{product.description}</Typography>
        <Typography variant="subtitle1">{product.price}</Typography>
        <List>
            {product.parameters.map((param, index) => (
            <ListItem key={index}>
              <Typography variant="body2">{param.name}: {param.value}</Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;