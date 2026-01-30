import Board from "./pages/Board";

<Route
  path="/board/:id"
  element={
    <PrivateRoute>
      <Board />
    </PrivateRoute>
  }
/>
