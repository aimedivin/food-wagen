import api from "@/lib/axios";
import { IMeal } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const fetchMeals = createAsyncThunk<
  Array<IMeal>,
  { page: number; limit: number; searchQuery?: string },
  { rejectValue: { status: number; message: string } }
>("fetch/meals", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.get<Array<IMeal>>("/Food", {
      params: {
        page: payload.page,
        limit: payload.limit,
        name: payload.searchQuery,
        sortBy: "createdAt",
        order: "desc",
      },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue({
      status: (err as AxiosError).response?.status ?? 500,
      message: "Something went wrong. Please try again.",
    });
  }
});

export const addNewMeal = createAsyncThunk<
  Array<IMeal>,
  Partial<IMeal>,
  { rejectValue: { status: number; message: string } }
>("addNew/meal", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post<Array<IMeal>>("/Food", payload);
    return res.data;
  } catch (err) {
    return rejectWithValue({
      status: (err as AxiosError).response?.status ?? 500,
      message: "Something went wrong. Please try again.",
    });
  }
});

export const updateMeal = createAsyncThunk<
  Array<IMeal>,
  Partial<IMeal>,
  { rejectValue: { status: number; message: string } }
>("update/meal", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.put<Array<IMeal>>(`/Food/${payload.id}`, payload);
    return res.data;
  } catch (err) {
    return rejectWithValue({
      status: (err as AxiosError).response?.status ?? 500,
      message: "Something went wrong. Please try again.",
    });
  }
});

export const deleteMeal = createAsyncThunk<
  Array<IMeal>,
  { id: string },
  { rejectValue: { status: number; message: string } }
>("delete/meal", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.delete<Array<IMeal>>(`/Food/${payload.id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue({
      status: (err as AxiosError).response?.status ?? 500,
      message: "Something went wrong. Please try again.",
    });
  }
});
