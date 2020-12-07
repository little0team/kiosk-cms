import { formatDateTime } from 'utils/formatDateTime';

export const headers = [
  { header: 'เลขที่รายการ', key: 'orderNo', width: 20 },
  { header: 'ช่องทาง', key: 'orderChannel', width: 25 },
  { header: 'ประเภทรับสินค้า', key: 'pickupType', width: 25 },
  { header: 'ช่องทางการจ่ายเงิน', key: 'paymentChannel', width: 20 },
  { header: 'เลขที่อ้างอิง (การจ่ายเงิน)', key: 'refPayment', width: 15 },
  { header: 'สถานะ', key: 'status', width: 15 },
  { header: 'ราคารวมสินค้า', key: 'totalPrice', width: 20 },
  { header: 'วันที่ดำเนินการ', key: 'createdAt', width: 15 },
];

export const convertToExport = (datas) => {
  const status = new Map([
    ['IN_LIST', 'รอดำเนินการ'],
    ['SERVED', 'สำเร็จ'],
  ]);

  return datas.map((data) => {
    return {
      ...data,
      status: status.get(data.status),
      createdAt: formatDateTime(data.createdAt),
    };
  });
};
