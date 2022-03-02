/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { Card, Grid, CardActionArea, CardActions, Paper, CardContent, CardMedia, Button, Typography, Box }  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import items from './data';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },

  });

export default function product() {
const classes = useStyles();

const [cart, setCart] = useState(items);
const addToCart = i => {
    setCart(prevState =>
      prevState.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            inCart: true,
            count: item.counterVal
          };
        }
        return item;
      })
    );
  };

  const increaseQuantity = i => {
    setCart(prevCart =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 9) {
            return item;
          } else return { ...item, count: item.count + 1 };
        } else if (i === o) {
          if (item.counterVal > 9) {
            return item;
          } else
            return {
              ...item,
              counterVal: item.counterVal + 1
            };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = i => {
    setCart(prevCart =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 1) {
            return { ...item, count: item.count - 1 };
          } else {
            return item;
          }
        } else if (i === o && item.counterVal > 1) {
          return {
            ...item,
            counterVal: item.counterVal - 1
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = i => {
    setCart(prevCart =>
      prevCart.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            count: 0,
            counterVal: 1,
            inCart: false
          };
        }
        return item;
      })
    );
  };

  const cartItems = cart.map((item, i) => (
    <React.Fragment key={item.title}>
      {item.inCart && (
        <>
        <Paper style={{ width: '100%', padding: 10}} elevation={3}>            
        <Box display="flex" justifyContent="space-between" alignItems={"center"}>
            <img src={item.img} width='100px' height='100px' alt="product" />
            <Box>
          <Typography variant="h6" color="textSecondary" component="p"> Item Name: {item.title}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Item Count: 
          </Typography>
          <Button onClick={() => decreaseQuantity(i)}>-</Button>{" "}
            {item.count} <Button onClick={() => increaseQuantity(i)}>+</Button>
          <Typography variant="body1" color="textSecondary">
            Item Subtotal: $
            {Number.isInteger(item.count * item.price)
              ? item.count * item.price
              : `${(item.count * item.price).toFixed(2)}`}
          </Typography>
          </Box>
          <Box>
          <Button color="primary" size="small" variant='contained' onClick={() => removeFromCart(i)}>Remove From Cart</Button>
          </Box>

          </Box>
          </Paper>
        </>
      )}
    </React.Fragment>
  ));

  const cartProducts = () => (
  
          cart.map((item, i) => (  
              <Grid item> 
              <br />     
            <Card style={{ maxWidth :350, minWidth: 350 }}>
            <CardActionArea>
                <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="100"
                image={item.img}
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                   {item.des}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                   {item.price}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            {!item.inCart ? (
            <>
              <Button size="small" color="primary" onClick={() => decreaseQuantity(i)}>-</Button>
              <input style={{ width: '20px' }} readOnly type="text" value={item.counterVal} />
              <Button size="small" color="primary" onClick={() => increaseQuantity(i)}>+</Button>
              <br />
              <Button variant='contained' size="small" color="primary" onClick={() => addToCart(i)}>Add to Cart</Button>
            </>
          ) : (
              <center>
            <Typography variant='h5'>
              <b>Item added!</b>
            </Typography>
            </center>
          )}
            </CardActions>
            </Card>
            </Grid>
             )))

  const cartCountTotal = cart.reduce((acc, item) => acc + item.count, 0);
  const cartPriceTotal = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const cartTotals = () => (
      <>
    <Paper  style={{ width: '100%', padding: 8,  border: '3px solid blue'}} elevation={3}>
        <Typography variant='h6'>Items in Cart: {cartCountTotal}</Typography>
        <br />
        <Typography variant='h5' color="primary">
          Total Price: $
          {Number.isInteger(cartPriceTotal)
            ? cartPriceTotal
            : cartPriceTotal.toFixed(2)}
        </Typography>
        </Paper>
        </>
  );

  return (
      <>
      <Paper style={{ padding: 1, backgroundColor : 'Highlight', border: '3px solid blue'}} elevation={3}>
      <h1>Product</h1>
      </Paper>
      <br />
      <Grid container  className={classes.root} spacing={2}>
    <Grid item xs={12} md={6} >
      <Grid container justifyContent="center" spacing={2}>
      {cartProducts()}
      </Grid>
      </Grid>
      <Grid item xs={12} md={5} >
          <Box>
      {cartItems}
      <br />
      {cartTotals()}
      </Box>
      </Grid>
    </Grid>
    </>
  )
}
