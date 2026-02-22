import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { fetchUsersThunk } from '../store/usersSlice'

function useUsers() {
  const dispatch = useDispatch<AppDispatch>()
  
  // read from Redux store
  const users = useSelector((state: RootState) => state.users.users)
  const loading = useSelector((state: RootState) => state.users.loading)
  const error = useSelector((state: RootState) => state.users.error)

  useEffect(() => {
    // only fetch if we dont have users yet
    // prevents re-fetching every time we visit the page
    if (users.length === 0) {
      dispatch(fetchUsersThunk())
    }
  }, [])

  return { users, loading, error }
}

export default useUsers