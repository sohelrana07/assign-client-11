import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Employees = () => {
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    data: employees = [],
    refetch,
  } = useQuery({
    queryKey: ["my-employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-employees");
      return res.data;
    },
  });

  /* X/Y employees used info */
  const { data: hr = {} } = useQuery({
    queryKey: ["hr-profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/me");
      return res.data;
    },
  });

  /* handle Remove Employee */
  const handleEmployeeRemove = (employee) => {
    Swal.fire({
      title: "Remove from team?",
      text: `${employee.employeeName} will be removed from your company`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/my-employees/remove/${employee.employeeEmail}`)
          .then((res) => {
            if (res.data.modifiedCount) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Employee removed successfully",
                showConfirmButton: false,
                timer: 1500,
              });

              refetch();
            }
          });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <title>AssetVerse | My-Employees</title>

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">My Employee List</h2>
          <p className="text-gray-500 text-sm">
            Employees working under your company
          </p>
        </div>

        {/* X / Y employees */}
        <div className="px-6 py-4 text-center">
          <p className="text-sm font-medium text-gray-500">Employees Used</p>
          <p className="text-2xl font-bold text-amber-600">
            {hr.currentEmployees || 0}
            <span className="text-gray-400"> / {hr.packageLimit || 0}</span>
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow">
        <table className="w-full min-w-[800px] border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Join Date</th>
              <th className="p-4 text-center">Assets</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr
                  key={employee.employeeEmail}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* Photo + Name */}
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={
                        employee.profileImage ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTdZViE66j-NjGxox1Yz2JCNB7cP_byawE3w&s"
                      }
                      alt="employee"
                      className="w-10 h-10 rounded-full object-cover border border-primary"
                    />
                    <span className="font-semibold text-gray-800">
                      {employee.employeeName}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="p-4 text-gray-600">
                    {employee.employeeEmail}
                  </td>

                  {/* Join Date */}
                  <td className="p-4 text-gray-600">
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </td>

                  {/* Assets */}
                  <td className="p-4 text-center font-semibold">
                    {employee.assetsCount}
                  </td>

                  {/* Remove */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleEmployeeRemove(employee)}
                      className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-red-50 text-red-600 border border-red-200 rounded-sm hover:bg-red-100 transition"
                    >
                      <FaTrash size={12} /> Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
