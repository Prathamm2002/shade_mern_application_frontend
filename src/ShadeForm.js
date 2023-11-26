import React, { useState } from "react";
import axios from "axios";
import "./ShadeForm.css";

const ShadeForm = () => {
	const [shadeValue, setShadeValue] = useState("");
	const [shadeData, setShadeData] = useState(null);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const newShadeValue = shadeValue * 1;
			console.log(newShadeValue);
			console.log(shadeData);
			const response = await axios.get(
				`https://aceiint-business-application-backend.onrender.com/shadeapplication/${shadeValue}`
			);
			console.log(response);
			setShadeData(response.data.data.ONETOUR); // Adjust according to your API response structure
			setError(null);
		} catch (err) {
			console.log(err);
			setError("Shade not found");
			setShadeData(null);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Enter Shade Number:
					<input
						type="text"
						value={shadeValue}
						onChange={(e) => setShadeValue(e.target.value)}
					/>
				</label>
				<button type="submit">Get Shade</button>
			</form>

			{error && <p>{error}</p>}

			{shadeData && (
				<div>
					<p>Shade: {shadeData.Shade}</p>

					{/* Styled table */}
					<table className="shade-table">
						<thead>
							<tr>
								<th>Field</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(shadeData)
								.filter(([key, value]) => value !== null && key !== "_id")
								.map(([key, value]) => (
									<tr key={key}>
										<td>{key}</td>
										<td>{value}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default ShadeForm;
