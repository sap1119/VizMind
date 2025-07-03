import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Camera, 
  Moon, 
  Sun, 
  Save, 
  Eye, 
  EyeOff,
  AlertCircle,
  CheckCircle,
  LogOut,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface ProfileForm {
  full_name: string;
  email: string;
  phone: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const SettingsPage: React.FC = () => {
  const { user, signOut, updateProfile } = useAuth();
  const { isDarkMode, toggleTheme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [profileData, setProfileData] = useState<any>(null);

  const profileForm = useForm<ProfileForm>();
  const passwordForm = useForm<PasswordForm>();

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
      } else {
        setProfileData(data);
        profileForm.reset({
          full_name: data.full_name || '',
          email: data.email || user.email || '',
          phone: data.phone || ''
        });
      }
    } catch (err) {
      console.error('Unexpected error loading profile:', err);
    }
  };

  const handleProfileUpdate = async (data: ProfileForm) => {
    setLoading(true);
    try {
      // Update email if changed
      if (data.email !== user?.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email
        });
        
        if (emailError) {
          toast.error('Failed to update email: ' + emailError.message);
          setLoading(false);
          return;
        }
        
        toast.success('Email update initiated. Please check your new email for confirmation.');
      }

      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          phone: data.phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user!.id);

      if (error) {
        toast.error('Failed to update profile');
      } else {
        toast.success('Profile updated successfully!');
        await loadProfile();
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (data: PasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      passwordForm.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }

    if (data.newPassword.length < 6) {
      passwordForm.setError('newPassword', { message: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) {
        toast.error('Failed to update password: ' + error.message);
      } else {
        toast.success('Password updated successfully!');
        passwordForm.reset();
      }
    } catch (err) {
      console.error('Error updating password:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size must be less than 2MB');
      return;
    }

    setLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user!.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        toast.error('Failed to upload image');
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user!.id);

      if (updateError) {
        toast.error('Failed to update profile picture');
      } else {
        toast.success('Profile picture updated successfully!');
        await loadProfile();
      }
    } catch (err) {
      console.error('Error uploading avatar:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to sign out? This will end your premium session.')) {
      try {
        await signOut();
        toast.success('Signed out successfully. Your premium session has ended.');
      } catch (error) {
        toast.error('Failed to sign out');
      }
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'appearance', name: 'Appearance', icon: isDarkMode ? Moon : Sun },
    { id: 'account', name: 'Account', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <nav className="space-y-1 p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                  </div>

                  <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-6">
                    {/* Avatar Upload */}
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                          {profileData?.avatar_url ? (
                            <img 
                              src={profileData.avatar_url} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-8 h-8 text-white" />
                          )}
                        </div>
                        <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                          <Camera className="w-3 h-3 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Profile Picture</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Upload a new profile picture (max 2MB)
                        </p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          {...profileForm.register('full_name', { required: 'Full name is required' })}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter your full name"
                        />
                        {profileForm.formState.errors.full_name && (
                          <p className="text-red-500 text-sm mt-1">
                            {profileForm.formState.errors.full_name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          {...profileForm.register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          type="email"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter your email"
                        />
                        {profileForm.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {profileForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          {...profileForm.register('phone')}
                          type="tel"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Settings</h2>
                  </div>

                  <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          {...passwordForm.register('currentPassword', { required: 'Current password is required' })}
                          type={showPasswords.current ? 'text' : 'password'}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {passwordForm.formState.errors.currentPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {passwordForm.formState.errors.currentPassword.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          {...passwordForm.register('newPassword', { 
                            required: 'New password is required',
                            minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters'
                            }
                          })}
                          type={showPasswords.new ? 'text' : 'password'}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {passwordForm.formState.errors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {passwordForm.formState.errors.newPassword.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          {...passwordForm.register('confirmPassword', { required: 'Please confirm your password' })}
                          type={showPasswords.confirm ? 'text' : 'password'}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {passwordForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
                      >
                        <Lock className="w-4 h-4" />
                        <span>{loading ? 'Updating...' : 'Update Password'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    {isDarkMode ? (
                      <Moon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Sun className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    )}
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance Settings</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme Preference</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setTheme('light')}
                          className={`p-4 border-2 rounded-lg transition-all ${
                            !isDarkMode
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Sun className="w-6 h-6 text-yellow-500" />
                            <div className="text-left">
                              <h4 className="font-medium text-gray-900 dark:text-white">Light Mode</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Clean and bright interface</p>
                            </div>
                          </div>
                          {!isDarkMode && (
                            <CheckCircle className="w-5 h-5 text-blue-500 ml-auto" />
                          )}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setTheme('dark')}
                          className={`p-4 border-2 rounded-lg transition-all ${
                            isDarkMode
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Moon className="w-6 h-6 text-blue-500" />
                            <div className="text-left">
                              <h4 className="font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Easy on the eyes</p>
                            </div>
                          </div>
                          {isDarkMode && (
                            <CheckCircle className="w-5 h-5 text-blue-500 ml-auto" />
                          )}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={toggleTheme}
                          className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-all"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full"></div>
                            <div className="text-left">
                              <h4 className="font-medium text-gray-900 dark:text-white">Toggle</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Switch themes quickly</p>
                            </div>
                          </div>
                        </motion.button>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Theme Persistence</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Your theme preference is automatically saved and will be remembered across sessions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account Management</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Account Status */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">Premium Plan Active</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Full access to all VIZMINDS analytics features
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Plan:</span>
                          <p className="font-medium text-gray-900 dark:text-white">Premium</p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Status:</span>
                          <p className="font-medium text-green-600 dark:text-green-400">Active</p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Member Since:</span>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {profileData?.created_at ? new Date(profileData.created_at).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">User ID:</span>
                          <p className="font-medium text-gray-900 dark:text-white text-xs">
                            {user?.id?.substring(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sign Out Section */}
                    <div className="border border-red-200 dark:border-red-800 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                          <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Sign Out</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Signing out will end your current premium session. You'll need to sign in again to access your analytics data and premium features.
                          </p>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out of Premium Plan</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Account Info */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Account Security</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Your account is secured with industry-standard encryption. All data is stored securely and never shared with third parties.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};