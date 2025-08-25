import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

// custom eslint config
eslintConfig.push({
  rules:{
    'react-hooks/exhautive-deps':'off', // menonaktifkan eslint reactHooks seperti useEffect yang terlalu strict dngan dependencies nya,
    "react/jsx-key":"off", // menonaktifkan kewajiban menggunakan key, tpi klo off klo build ada error harus benerin sendiri
    "@typescript-eslint/no-explicit-any":"off", // sebenarnya kita gaboleh pake any, tpi kita akan pake midtrans yg belum support penuh dengan react
    "@typescript-eslint/no-unused-vars":"off",
  }
})

export default eslintConfig;
