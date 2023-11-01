
import { setLoading } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";



// export const sendOtp = async (email, navigate, dispatch) => {
//     // const dispatch = useDispatch();
//     dispatch(setLoading(true));
//     const toastId = toast.loading("Loading...");

//     try {
        
//         const response = await apiConnector("POST", endpoints.SENDOTP_API, {
//             email
//         });
//         console.log("SENDOTP API RESPONSE............", response);

//         if (!response.data.success) {
//             throw new Error(response.data.message)
//         }

//         toast.success("OTP Sent Successfully");
//         navigate("/verify-email");

//     } catch (error) {
//         console.log("SENDOTP API ERROR............", error)
//         toast.error("Could Not Send OTP")
//     }

//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
// }



export function sendOtp(email, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", endpoints.SENDOTP_API, {
          email,
          checkUserPresent: true,
        })
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
}