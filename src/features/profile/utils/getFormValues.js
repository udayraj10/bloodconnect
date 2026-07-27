export const defaultProfileValues = {
  fullName: "",
  email: "",
  age: "",
  phone: "",
  bloodGroup: "",
  city: "",
  address: "",
  isAvailable: false,
  lastDonationDate: "",
}

export const getProfileFormValues = (user) => ({
  fullName: user?.fullName ?? "",
  email: user?.email ?? "",
  age: user?.age ?? "",
  phone: user?.phone ?? "",
  bloodGroup: user?.bloodGroup ?? "",
  city: user?.city ?? "",
  address: user?.address ?? "",
  isAvailable: user?.isAvailable ?? false,
  lastDonationDate: user?.lastDonationDate ?? "",
})
