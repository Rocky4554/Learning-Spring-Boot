'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getToken } from '@/lib/auth';
import { apiCall } from '@/lib/api';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function DoctorsPage() {
    const router = useRouter();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Modal and booking state
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [bookingData, setBookingData] = useState({
        appointmentTime: '',
        reason: ''
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingError, setBookingError] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(null);

    // Get patient data from Redux
    const { data: patient } = useSelector((state) => state.patient);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }
        fetchDoctors();
    }, [router]);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const token = getToken();
            
            const result = await apiCall('http://localhost:8080/api/doctors', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (result.success) {
                setDoctors(result.data);
                setFilteredDoctors(result.data);
            } else {
                setError(result.error || 'Failed to fetch doctors');
            }
        } catch (err) {
            setError('An error occurred while fetching doctors');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredDoctors(doctors);
        } else {
            const filtered = doctors.filter(doctor => 
                doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doctor.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredDoctors(filtered);
        }
    }, [searchTerm, doctors]);

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setShowModal(true);
        setBookingError(null);
        setBookingSuccess(null);
        setBookingData({
            appointmentTime: '',
            reason: ''
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDoctor(null);
        setBookingData({
            appointmentTime: '',
            reason: ''
        });
        setBookingError(null);
        setBookingSuccess(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitBooking = async (e) => {
        e.preventDefault();
        
        if (!patient?.id) {
            setBookingError('Patient information not found. Please refresh the page.');
            return;
        }

        if (!bookingData.appointmentTime || !bookingData.reason) {
            setBookingError('Please fill in all required fields');
            return;
        }

        setBookingLoading(true);
        setBookingError(null);

        try {
            const token = getToken();
            const endpoint = `http://localhost:8080/api/appointments/create/${selectedDoctor.id}/${patient.id}`;
            
            const result = await apiCall(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    appointmentTime: bookingData.appointmentTime,
                    reason: bookingData.reason
                })
            });

            if (result.success) {
                setBookingSuccess('Appointment booked successfully!');
                setTimeout(() => {
                    closeModal();
                }, 2000);
            } else {
                // Handle unique constraint violation or other errors
                const errorMessage = result.error || '';
                if (errorMessage.includes('already booked') || 
                    errorMessage.includes('already exists') || 
                    errorMessage.includes('duplicate') ||
                    errorMessage.includes('time slot')) {
                    setBookingError('This doctor is already booked for this time slot. Please choose a different time.');
                } else {
                    setBookingError(errorMessage || 'Failed to book appointment. Please try again.');
                }
            }
        } catch (err) {
            setBookingError('An error occurred while booking the appointment');
            console.error(err);
        } finally {
            setBookingLoading(false);
        }
    };

    // Get minimum datetime (current time + 1 hour)
    const getMinDateTime = () => {
        const now = new Date();
        now.setHours(now.getHours() + 1);
        return now.toISOString().slice(0, 16);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find a Doctor</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Search and connect with healthcare professionals</p>
                    </div>
                    <Link href="/" className="btn btn-secondary">
                        ← Back to Home
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="card p-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name, specialization, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Doctors Grid */}
                {filteredDoctors.length === 0 ? (
                    <div className="card p-12 text-center">
                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No doctors found</h3>
                        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDoctors.map((doctor) => (
                            <div key={doctor.id} className="card p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0">
                                        {doctor.name?.charAt(0)?.toUpperCase() || 'D'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                                            Dr. {doctor.name}
                                        </h3>
                                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                            {doctor.specialization || 'General Practice'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="truncate">{doctor.email}</span>
                                    </div>
                                    {doctor.phone && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <span>{doctor.phone}</span>
                                        </div>
                                    )}
                                    {doctor.experience && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{doctor.experience} years experience</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button 
                                        onClick={() => handleBookAppointment(doctor)}
                                        className="w-full btn bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                                    >
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Book Appointment</h2>
                            <button 
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Doctor Info */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg">
                                    {selectedDoctor?.name?.charAt(0)?.toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">Dr. {selectedDoctor?.name}</p>
                                    <p className="text-sm text-blue-600 dark:text-blue-400">{selectedDoctor?.specialization}</p>
                                </div>
                            </div>
                        </div>

                        {/* Success Message */}
                        {bookingSuccess && (
                            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {bookingSuccess}
                            </div>
                        )}

                        {/* Error Message */}
                        {bookingError && (
                            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                                {bookingError}
                            </div>
                        )}

                        {/* Booking Form */}
                        <form onSubmit={handleSubmitBooking} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Appointment Date & Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    name="appointmentTime"
                                    value={bookingData.appointmentTime}
                                    onChange={handleInputChange}
                                    min={getMinDateTime()}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Select a future date and time for your appointment
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Reason for Visit <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="reason"
                                    value={bookingData.reason}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                    maxLength="1000"
                                    placeholder="Please describe the reason for your appointment..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {bookingData.reason.length}/1000 characters
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 btn btn-secondary"
                                    disabled={bookingLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={bookingLoading}
                                    className="flex-1 btn bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {bookingLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                            Booking...
                                        </span>
                                    ) : (
                                        'Confirm Booking'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}