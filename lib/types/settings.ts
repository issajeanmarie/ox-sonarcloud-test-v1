/**
 * AUTH TYPES
 * @author Elie K. Gashagaza
 * @authorEmail gashagaza@awesomity.rw
 * @since Jul 2022
 */

export type ProfileResponse = {
    id: number,
    email: string,
    names: string,
    phone: string,
    role: string,
    enabled: boolean,
    gender: string,
    profilePic: string
}