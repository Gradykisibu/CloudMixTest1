import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          color: "grey",
          width: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="#F3F5F7" 
          indicatorColor="#F3F5F7"
          aria-label="basic tabs example"
        >
          <Tab
            label="CloudMix"
            {...a11yProps(0)}
            sx={{
              color: "#777777",
              marginRight: "30px",
            }}
          />
          <Tab
            label="Replies"
            {...a11yProps(1)}
            sx={{
              color: "#777777",
              marginRight: "30px",
              marginLeft: "30px",
            }}
          />
          <Tab
            label="Likes"
            {...a11yProps(2)}
            sx={{
              color: "#777777",
              marginLeft: "30px",
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} style={{ color: "#F3F5F7" }}>
        <Box>
        Item One
        </Box>
        <Box>
        Item One
        </Box>
        <Box>
        Item One
        </Box>
        <Box>
        Item One
        </Box>
        <Box>
        Item One
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} style={{ color: "#F3F5F7" }}>
      <Box>
        Item Two
        </Box>
        <Box>
        Item One
        </Box>
        <Box>
        Item One
        </Box>
        <Box>
        Item One
        </Box>
        <Box>
        Item One
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} style={{ color: "#F3F5F7" }}>
      <Box>
        Item Three
        </Box>
        <Box>
        Item One
        </Box>
        <Box>
        Item One
        </Box>
        <Box>
        Item One
        </Box>
        <Box>
        Item One
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
