

export type Booking = {
  userId: string;
  vehicleId: string;
  start_date: Date;
  end_date: Date;

};


 export type updateBookingType = {
  id:string,
  status: "pending" | "confirmed" | "cancelled" | "completed";
};