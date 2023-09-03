import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, CircularProgress, Container } from '@mui/material';
import useFetchAllProducts from '../hooks/useFetchAllProducts';

type Props = {
  setSelectedProductId: (id: string | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
};

type ProductData = {
  id: string;
  name: string;
  photo: string;
};

const ProductList: React.FC<Props> = ({ setSelectedProductId, setIsModalOpen }) => {
  const url = 'https://favi-endpoint-vunqxcib5a-lm.a.run.app/products';
  const [products, isLoading] = useFetchAllProducts<ProductData[]>(url);

  const selectProduct = (id: string) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!products) {
    return <div>No Data</div>;
  }

  return (
    <Container>
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={8} sm={4} md={3} spacing={4} key={product.id}>
          <Card>
            <CardActionArea onClick={() => selectProduct(product.id)}>
              <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={product.photo}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Container>
  );
};

export default ProductList;
