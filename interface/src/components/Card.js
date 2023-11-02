import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

const OutlinedCard = (props) => {
  const {cardTitle, count, description} = props
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card sx={{backgroundColor: "#Edeeee"}} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div" color="text.secondary">
            {cardTitle}
          </Typography>
          <Typography variant="h2" sx={{ m: 3,  }} >
            {count}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
            <br />
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OutlinedCard;
