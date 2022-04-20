import React from "react";
import DashboardContainer from "../components/DashboardContainer";
import TableOfTasks from "../components/TableOfTasks";

type Props = {};

function Tasks({}: Props) {
  return (
    <DashboardContainer>
      <TableOfTasks />
    </DashboardContainer>
  );
}

export default Tasks;
