export class SignUpDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class SignInDTO {
  email: string;
  password: string;
}

export class AuthResponseDTO {
  name?: string;
  email?: string;
  access_token?: string;
}
