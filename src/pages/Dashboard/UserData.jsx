import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get("http://localhost:8000/api/users")
                setUsers(response.data);

            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        }
        fetchData();
    }, []);

    //delete user
    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8000/api/delete/user/${id}`);
        try {
            setUsers((prevUser) => prevUser.filter((user) => user._id !== id))
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);

        }

    }



    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-6">Users Details</h2>

            <div className="overflow-x-auto ml-5">
                <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr className="text-center">
                            <th className="py-3 px-4">S No.</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Phone</th>
                            <th className="py-3 px-4">Message</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className="border-t hover:bg-gray-100 transition"
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{user.firstName} {user.lastName}</td>
                                <td className="py-3 px-4 break-words">{user.email}</td>
                                <td className="py-3 px-4">{user.phone}</td>
                                <td className="py-3 px-4 break-words">{user.message}</td>
                                <td className="py-3 px-4">
                                    <button onClick={() => deleteUser(user._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;