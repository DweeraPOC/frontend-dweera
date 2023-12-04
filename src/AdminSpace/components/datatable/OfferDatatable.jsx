import React, {useEffect} from "react";
import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { OfferColumns } from "../../datatablesource";
import { useState } from "react";
import updateoffer from "../../../Api/updateofferapproval";
import Modal from '../modal/modal';
import { useDispatch } from "react-redux";
import { SHOW_MODAL_OFFER } from "../../../Redux/Actions/actions";
import { useAuth } from "../../../Middlewares/AuthContext";
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const OfferDatatable = () => {

  const auth = useAuth();
  const [tableData, setTableData] = useState([]);
  const [exportData, setExportData] = useState([]);

  const getdata=()=>
  {
    axios.get(process.env.REACT_APP_MAIN_URL+"/admin/get-offers",
    { headers: { 'x-access-token': auth?.user.token}}).then((res) => {
      setTableData(res.data.offers)
      setExportData(res.data.offers); 
    })
  }
  useEffect(() => {
    getdata();
  },[])


  const UpdateOfferStatus = async (id,path) => {
    axios.patch(process.env.REACT_APP_MAIN_URL + "/admin/"+path,
      {
        OfferId : id
      },
      { 
        headers: { 'x-access-token': auth?.user.token } 
      })
      .then((res) => {
        if(res.status===200) getdata();
      })
  }
  const dispatch = useDispatch();
  const HandleView = (id) => {
    const offer = tableData.find((offer) => offer.offer_id === id);
    dispatch(SHOW_MODAL_OFFER(true,offer))
  }
  const handleExportToExcel = () => {
    const fileName = 'offers';
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';



    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => {
        let id = params?.row?.offer_id;
        return (
          <div className="cellAction">
            {/*<button type="button" onClick={() => {HandleView(id)}} style={{ textDecoration: "none" }}>
              <div className="viewButton">Details</div>
            </button>
            <div
              className="approvedButton"
              onClick={() => (
                UpdateOfferStatus(id,"approved-offer")
              )}
            >
              Approved
            </div>
            <Modal lid={id}/>*/}
            <button 
              type="button" 
              className="px-4 py-2 bg-gray-100 rounded-md text-black border-2 border-gray-300 text-center"
              onClick={() => {
                HandleView(id)
              }}
            >
              Details
            </button>
            <button 
              type="button" 
              className="px-4 py-2 rounded-md text-black border-2 border-[#65D01E] text-center"
              onClick={() => {
                UpdateOfferStatus(id,"approved-offer")
              }}
            >
              Approved
            </button>
            <button 
              type="button" 
              className="px-4 py-2 rounded-md text-black border-2 border-[#D01E33] text-center"
              onClick={() => {
                UpdateOfferStatus(id,"rejected-offer")
              }}
            >
              Rejected
            </button>
          </div>

        );
      },
    },
  ];
  return (
     <div className="datatable">
        <div className="datatableTitle">
          <div>
            <button
              type="button"
              className="px-4 py-2 bg-green-500 rounded-md text-white"
              onClick={handleExportToExcel}
            >
              Export to Excel
            </button>
          </div>
          Approve Offers
        </div>
      <DataGrid 
        className="datagrid"
        getRowId={(row)=>row?.offer_id}
        rows={tableData}
        columns={OfferColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection>
        </DataGrid>
      
    </div>
  );
};

export default OfferDatatable;
