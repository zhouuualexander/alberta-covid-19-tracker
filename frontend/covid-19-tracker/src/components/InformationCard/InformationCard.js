import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CountUp from 'react-countup';
const useStyles = makeStyles({
  root: {
    minWidth: 307,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const InformationCard = (props) => {
  const classes = useStyles();
  if (props.name === "Edmonton Zone" || props.name === "Calgary Zone") {
    return (
      <Card className={classes.root}>
        <CardContent
        >
          <Typography variant="h4" >
            {props.name}
          </Typography>
          <Typography variant="body1" >
            Total cases: {props.total}
            <br />
            Active cases: {props.active}
            <br />
            Deaths: {props.died}
          </Typography>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className={classes.root}>
        <CardContent
          style={{ margin: "0", justifyContent: "center", textAlign: "center" }}
        >
          <Typography variant="h5" component="h2" >
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Total cases: {<CountUp start={0} end={props.total} duration={2.5} />}
          </Typography>
        </CardContent>
      </Card>
    );
  }
};
export default InformationCard;
