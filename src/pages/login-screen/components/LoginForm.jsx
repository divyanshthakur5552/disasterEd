import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const LoginForm = ({ selectedRole, onRoleChange, className = "" }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const mockCredentials = {
    student: { email: "student@disasterguard.edu", password: "student123" },
    admin: { email: "admin@disasterguard.edu", password: "admin123" },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay

    const expected = mockCredentials[selectedRole];

    if (
      formData.email === expected.email &&
      formData.password === expected.password
    ) {
      localStorage.setItem("auth", "true");
      navigate("/landing-page");
    } else {
      setErrors({
        general: `Invalid credentials. Use ${expected.email} / ${expected.password}`,
      });
    }

    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    alert("Password reset link would be sent to your email address.");
  };

  const handleCreateAccount = () => {
    alert("Account registration functionality is not implemented.");
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="mb-6">
        <div className="flex bg-muted rounded-lg p-1">
          <button
            type="button"
            onClick={() => onRoleChange("student")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedRole === "student"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="GraduationCap" size={16} />
              <span>Student</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onRoleChange("admin")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedRole === "admin"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>Administrator</span>
            </div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <p className="text-sm text-destructive">{errors.general}</p>
            </div>
          </div>
        )}

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder={`Enter your ${selectedRole} email`}
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          disabled={isLoading}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            disabled={isLoading}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors duration-200"
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
          className="mt-6"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="w-full text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          disabled={isLoading}
        >
          Forgot your password?
        </button>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Don't have an account?{" "}
          </span>
          <button
            type="button"
            onClick={handleCreateAccount}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            disabled={isLoading}
          >
            Create Account
          </button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">
              Demo Credentials:
            </p>
            <p>
              <strong>Student:</strong> student@disasterguard.edu / student123
            </p>
            <p>
              <strong>Admin:</strong> admin@disasterguard.edu / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
