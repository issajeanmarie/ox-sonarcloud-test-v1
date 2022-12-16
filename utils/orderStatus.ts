export const orderStatus = (status: string | undefined) => {
  return {
    isCanceled: status === "CANCELLED",
    isComplete: status === "COMPLETED",
    isEnqueue: status === "ENQUEUE",
    isStarted: status === "STARTED"
  };
};

export const paymentStatus = (status: string | undefined) => {
  return {
    isPending: status === "PENDING",
    isFullPaid: status === "FULL_PAID",
    isHalfPaid: status === "HALF_PAID",
    isWrittenOff: status === "WRITTEN_OFF"
  };
};
