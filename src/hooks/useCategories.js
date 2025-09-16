import { useEffect, useState } from "react"
import api from "../services/auth"

export const useCategories = () => {
  const [categories, setCategories] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        console.log(response.data)
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
}