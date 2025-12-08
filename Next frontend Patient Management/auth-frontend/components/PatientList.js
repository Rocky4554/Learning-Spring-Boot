'use client';

export default function PatientList() {
    const patients = [
        { id: 1, name: 'Sarah Johnson', age: 34, condition: 'Flu Symptoms', status: 'Admitted', date: '2024-03-10' },
        { id: 2, name: 'Michael Chen', age: 45, condition: 'Routine Checkup', status: 'Discharged', date: '2024-03-09' },
        { id: 3, name: 'Emily Davis', age: 28, condition: 'Migraine', status: 'Waiting', date: '2024-03-11' },
        { id: 4, name: 'Robert Wilson', age: 62, condition: 'Hypertension', status: 'Monitoring', date: '2024-03-08' },
    ];

    return (
        <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Patients</h3>
                <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Patient Name</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Condition</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {patients.map((patient) => (
                            <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                                            {patient.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">{patient.name}</div>
                                            <div className="text-xs text-gray-500">{patient.age} yrs</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{patient.date}</td>
                                <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{patient.condition}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${patient.status === 'Admitted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : ''}
                    ${patient.status === 'Discharged' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}
                    ${patient.status === 'Waiting' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : ''}
                    ${patient.status === 'Monitoring' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                  `}>
                                        {patient.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-gray-400 hover:text-blue-500 transition-colors">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
