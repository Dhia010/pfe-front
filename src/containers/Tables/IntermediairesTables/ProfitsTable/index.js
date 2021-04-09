import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../../../../css/styles.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfit, getProfits } from "../../../../_redux/actions/profits";
import AddProfit from "../../../Modals/Intermediaire/AddProfit";
import EditProfit from "../../../Modals/Intermediaire/EditProfit";
const ProfitsTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfits());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const profits = useSelector((state) => state.profits.data);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [id, setId] = useState();

  const openSelectedProfitModal = (id) => {
    setEditModalShow(true);
    setId(id);
  };

  const deletePc = (id) => {
    dispatch(deleteProfit(id));
  };

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => deletePc(row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => openSelectedProfitModal(row.id)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
    {
      name: "Code Profit",
      selector: "ProfitCode",
      sortable: true,
    },
    {
      name: "Libellé Profit",
      cell: (row) => <div>{row.ProfitLabel ? row.ProfitLabel : "-"}</div>,
    },
    {
      name: "Date de mise à jour",
      cell: (row) => (
        <div>
          {row.UpdateDate ? moment(row.UpdateDate).format("YYYY-MM-DD") : "-"}
        </div>
      ),
    },
  ];

  const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        ref={ref}
        {...rest}
      />
      <label className="custom-control-label" onClick={onClick} />
    </div>
  ));

  return (
    <>
      <div className="card">
        <DataTable
          title="Codes Profit"
          responsive
          overflowY
          overflowYOffset="150px"
          columns={columns}
          data={profits}
          defaultSortField="Code Profit"
          pagination
          selectableRows
          selectableRowsComponent={BootyCheckbox}
        />
      </div>
      <div className="add-button">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setAddModalShow(true)}>
          <AddIcon />
        </Fab>
      </div>
      <AddProfit show={addModalShow} onHide={() => setAddModalShow(false)} />
      <EditProfit
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        profits={profits}
        id={id}
      />
    </>
  );
};

export default ProfitsTable;