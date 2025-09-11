import { useAuth as useAuthContext } from '../contexts/AuthContext'

/**
 * Re-export useAuth from AuthContext for convenience
 * This allows importing useAuth directly from hooks
 */
export const useAuth = useAuthContext