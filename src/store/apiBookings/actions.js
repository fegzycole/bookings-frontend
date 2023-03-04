import axios from "axios";
import { setIntentions, setStats } from "./slice";
import { ADMIN_ACCESS_TOKEN } from "../../helpers";

export const getIntentions = (period) => {
  return async (dispatch) => {
    const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/bookings${period ? period : ""}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    const {
      data: { data },
    } = response;
    dispatch(setIntentions(data));
  };
};

export const getDashboardStats = async () => {
  const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);

  const dailyQueryResponse = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/bookings?type=day`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

  const allTimeQueryResponse = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/bookings`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

  const {
    data: { data: dailyData },
  } = dailyQueryResponse;

  const {
    data: { data: allData },
  } = allTimeQueryResponse;

  return {
    daily: dailyData.length,
    allTime: allData.length,
  };
};

export const getMostRecentBookings = async () => {
  const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);

  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/bookings/latest`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

  const {
    data: { data },
  } = response;

  return data;
};

export const getStats = (period) => {
  return async (dispatch) => {
    const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/admin/getBookingStats${
        period ? period : ""
      }`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    const {
      data: { data },
    } = response;

    dispatch(setStats(data));
  };
};
