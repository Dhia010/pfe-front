import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberTable from "../../../containers/Tables/MemberTable";
import { getMembers } from "../../../_redux/actions/member";

const Adherents = () => {
  const dispatch = useDispatch();
  const token = localStorage.token;
  useEffect(() => {
    if (!token) return;
    dispatch(getMembers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const members = useSelector((state) => state.member.data);
  return (
    <div>
      <MemberTable members={members} />
    </div>
  );
};

export default Adherents;