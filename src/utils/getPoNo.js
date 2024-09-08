import { Counter } from "../modals/config/counter.js";

export const getPoNo = async (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();

  const fyStartYear = month >= 3 ? year : year - 1;
  const fyEndYear = (fyStartYear + 1) % 100;

  const fy = `${fyStartYear % 100}-${fyEndYear}`;

  const result = await Counter.findByIdAndUpdate(
    fy,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const lastNum = result.seq;
  const formattedNum = lastNum.toString().padStart(4, "0");

  return `NNPL/${formattedNum}/${fy}`;
};
