type UserOptionalId = Omit<User, "id"> & {id?: number}

export class User {
	id: number
	username: string
	email: string
	password: string
	is_activated: boolean
	activation_link: string

	constructor(user: UserOptionalId) {
		this.id = user.id || 1
		this.username = user.username
		this.email = user.email
		this.password = user.password
		this.is_activated = user.is_activated
		this.activation_link = user.activation_link
	}
}

export function createUserDto(user: User) {
	return {
		username: user.username,
		email: user.email,
		id: user.id,
		is_activated: Boolean(Number(user.is_activated))
	}
}