/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Kit 2 React components
import MKBox from "mui/components/MKBox";

// Sections components
import BaseLayout from "mui/layouts/sections/components/BaseLayout";
import View from "mui/layouts/sections/components/View";

// Stats page components
import PaginationSimple from "mui/layouts/sections/navigation/pagination/components/PaginationSimple";

// Stats page components code
import paginationSimpleCode from "mui/layouts/sections/navigation/pagination/components/PaginationSimple/code";

function Pagination() {
  return (
    <BaseLayout
      title="Pagination"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/navigation/pagination" },
        { label: "Pagination" },
      ]}
    >
      <View title="Pagination simple" code={paginationSimpleCode}>
        <MKBox py={3}>
          <PaginationSimple />
        </MKBox>
      </View>
    </BaseLayout>
  );
}

export default Pagination;