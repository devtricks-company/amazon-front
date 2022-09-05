import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
<<<<<<< HEAD

=======
>>>>>>> addingRegister
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
