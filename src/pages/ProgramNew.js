import React, { useEffect, useContext } from "react";
import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import MetaContext from "../store/meta-context";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      tabIndex={0}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

const ProgramNew = () => {
  const metaCtx = useContext(MetaContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    metaCtx.setTranslation(false);
  }, []);
  return (
    <>
      <Meta title="Program" />
      {/* <div
        className={
          "fixed t-24 h-0 l-0 w-full lg:pr-24 z-40 transform transition -translate-y-full"
        }
      >
        <div className="relative flex justify-between items-center bg-bg-filter border-b-2 text-white z-10">
          <div className="border-r-2 font-nav flex-grow">
            Event Program
          </div>
          <div className="border-r-2 font-nav flex-grow">
            Workshop Program
          </div>
          <div className="font-nav items-center flex-grow ">
            In Orbit
          </div>
        </div>
      </div> */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
            <Tab
              label="Event Program"
              {...a11yProps(0)}
              className="text-lg lg:text-2xl whitespace-nowrap font-nav"
            />
            <Tab label="Workshop Program" {...a11yProps(1)} />
            <Tab label="In Orbit" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>

      <Block
        title="Event Program "
        list
        url="wp/v2/agenda/?subcat=host&pricat=event&upcoming"
        // url="wp/v2/agenda/?subcat=host&pricat=event&past"
      />

      <Block
        title="Workshop Program"
        bg={true}
        list
        url="wp/v2/agenda/?subcat=host&pricat=workshop&upcoming"
        // url="wp/v2/agenda/?subcat=host&pricat=workshop&past"
      />

      <Block
        title="In Orbit "
        list
        // url="wp/v2/agenda/?subcat=circulation&upcoming"
        url="wp/v2/agenda/?in_pricat=workshop,residency,event&subcat=circulation&upcoming"
        // url="wp/v2/agenda/?in_pricat=workshop,residency,event&subcat=circulation&past"
      />
    </>
  );
};

export default ProgramNew;
