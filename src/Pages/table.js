import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { get1 } from "../Redux/actions";
// import Errors from "./errorhandling";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import {
  post,
  post1,
  FETCH_PRODUCTS_BEGIN,
  fetchProductsBegin,
} from "../Redux/actions";
import { connect } from "react-redux";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function Producthooks(props) {
  // const dispatch = useDispatch();
  useEffect(() => {
    // props.dispatch({ type: FETCH_PRODUCTS_BEGIN });
    props.begin();
    props.get1();
    console.log(props);
  }, []);

  // const { data, loading, error } = useSelector(
  //   (state) => state.products,
  //   shallowEqual
  // );
  const [states, setStates] = useState();
  const postaddressReason = async (data) => {
    let data1 = JSON.stringify({ addressReason: data });
    props.post1(data1);
  };
  if (props.error) {
    console.log(props.error);
    // return <Errors error={props.error} />;
    return "error";
  }

  return props.loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Editable Preview"
        columns={[
          { title: "Id", field: "id", editable: "never" },
          { title: "State", field: "addressReason" },
        ]}
        data={props.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              console.log(newData);
              setTimeout(() => {
                setStates(newData.addressReason);
                // this.setState({ ...this.state.data, newData });
                postaddressReason(newData.addressReason);
                resolve();
              }, 1000);
            }),
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         const dataUpdate = [...data];
          //         const index = oldData.tableData.id;
          //         dataUpdate[index] = newData;
          //         setData([...dataUpdate]);

          //         resolve();
          //       }, 1000);
          //     }),
          //   onRowDelete: (oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         const dataDelete = [...data];
          //         const index = oldData.tableData.id;
          //         dataDelete.splice(index, 1);
          //         setData([...dataDelete]);

          //         resolve();
          //       }, 1000);
          //     }),
        }}
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
  data: state.reducer.data,
  loading: state.reducer.loading,
  error: state.reducer.error,
});
const mapDispatchToProps = (dispatch) => {
  return {
    get1: () => dispatch(get1()),
    post1: (data) => dispatch(post1(data)),
    begin: () => dispatch(fetchProductsBegin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Producthooks);
