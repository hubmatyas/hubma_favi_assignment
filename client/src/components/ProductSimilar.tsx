import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CircularProgress, Grid, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

type ProductSimilarProps = {
  productId: string;
};

type ProductData = {
  id: string;
  name: string;
  photo: string;
  description: string;
  price: string;
};

const ProductSimilar: React.FC<ProductSimilarProps> = ({ productId }) => {
  const [similarProducts, setSimilarProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      setIsLoading(true);
      const res = await fetch(`https://favi-endpoint-vunqxcib5a-lm.a.run.app/products/${productId}/similar`);
      const data = await res.json();
      setSimilarProducts(data);
      setIsLoading(false);
    };

    fetchSimilarProducts();
  }, [productId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Podobné</Typography>
      </Grid>
      {similarProducts.map((prod) => (
        <Grid item xs={12} sm={6} md={4} key={prod.id}>
          <Link to={`/product/${prod.id}/detail`} style={{ textDecoration: 'none' }}>
            <Card>
              <CardActionArea>
                <CardMedia component="img" height="140" image={prod.photo} alt={prod.name} />
                <CardContent>
                  <Typography variant="h6">{prod.name}</Typography>
                  <Typography variant="subtitle1">{prod.price} Kč</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductSimilar;
