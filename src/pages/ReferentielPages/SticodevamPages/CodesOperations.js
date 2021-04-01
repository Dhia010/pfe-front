import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OperationTable from "../../../containers/Tables/OperationTable";
import { getOperationCodes } from "../../../_redux/actions/operationCode";

const CodesOperations = () => {
  const dispatch = useDispatch();
  const token = localStorage.token;
  useEffect(() => {
    if (!token) return;
    dispatch(getOperationCodes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const operations = useSelector((state) => state.operationCode.data);
  return (
    <div>
      <OperationTable operations={operations} />
    </div>
  );
};

export default CodesOperations;