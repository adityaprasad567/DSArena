import { Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import Sorting from "@/pages/visualizers/Sorting";
import Searching from "@/pages/visualizers/Searching";
import Graph from "@/pages/visualizers/Graph";
import BubbleSort from "@/pages/visualizers/sorting/BubbleSort";
import MergeSort from "@/pages/visualizers/sorting/MergeSort";
import QuickSort from "@/pages/visualizers/sorting/QuickSort";
import LinearSearch from "@/pages/visualizers/searching/LinearSearch";
import BinarySearch from "@/pages/visualizers/searching/BinarySearch";
import Structures from "@/pages/visualizers/Structures";
import StackPage from "@/pages/visualizers/structures/Stack";
import QueuePage from "@/pages/visualizers/structures/Queue";
import LinkedList from "@/pages/visualizers/structures/LinkedList";
import BST from "@/pages/visualizers/structures/BST";
import BFS from "@/pages/visualizers/graph/BFS";
import DFS from "@/pages/visualizers/graph/DFS";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <AppLayout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/sorting" element={<Sorting />} />
              <Route path="/sorting/bubble-sort" element={<BubbleSort />} />
              <Route path="/sorting/merge-sort" element={<MergeSort />} />
              <Route path="/sorting/quick-sort" element={<QuickSort />} />
              <Route path="/searching" element={<Searching />} />
              <Route path="/searching/linear-search" element={<LinearSearch />} />
              <Route path="/searching/binary-search" element={<BinarySearch />} />
              <Route path="/graph" element={<Graph />} />
              <Route path="/graph/bfs" element={<BFS />} />
              <Route path="/graph/dfs" element={<DFS />} />
              <Route path="/structures" element={<Structures />} />
              <Route path="/structures/stack" element={<StackPage />} />
              <Route path="/structures/queue" element={<QueuePage />} />
              <Route path="/structures/linked-list" element={<LinkedList />} />
              <Route path="/structures/bst" element={<BST />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        }
      />
    </Routes>
  );
}
