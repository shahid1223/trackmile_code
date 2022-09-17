import {toast} from "react-toastify"


export const successToast = ({mes, ...props}) => {
    toast.success(mes,{
        ...props
    })
}
export const errorToast = ({mes, ...props}) => {
    toast.error(mes,{...props})
}

