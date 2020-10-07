import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import DoughnutChart from 'components/Charts/doughnut';
import useInterval from 'hooks/useInterval';
import handlePromise from 'utils/handlePromise';
import apiGetCategoryList from 'apis/dashboard/apiGetCategoryList';

function CategoryListWidget(props) {
  const [categoryList, setOrderInfo] = useState([]);
  useInterval(() => {
    const fetchOrderProduct = async () => {
      const [error, categoryList] = await handlePromise(apiGetCategoryList());

      if (error) return setOrderInfo([]);

      const categoryListChartData = formatChartData(categoryList);

      return setOrderInfo(categoryListChartData);
    };

    fetchOrderProduct();
  }, 3000);

  const formatChartData = (products) => {
    const [labels, data] = seperateData(products);

    return {
      labels,
      datasets: [
        {
          backgroundColor: [
            '#bff0ff',
            '#bfd7ff',
            '#ffbfd9',
            '#ffccbf',
            '#f5ffbf',
          ],
          data,
        },
      ],
    };
  };

  const seperateData = (products) => {
    let labels = [];
    let data = [];

    products.map((product) => {
      labels.push(product.orderProductName);
      return data.push(product.sumOrderProductQTY);
    });

    return [labels, data];
  };

  return (
    <Paper>
      <DoughnutChart data={categoryList} />
    </Paper>
  );
}

export default CategoryListWidget;
