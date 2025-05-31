"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MessageCircle, Phone, User, Briefcase } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function BookingApp() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [note, setNote] = useState("")
  const [errors, setErrors] = useState({})

  useEffect(() => {
    validateForm()
  }, [name, phone, service, date, time])

  const services = [
    "Limpeza Ar-condicionado",
    "Manutenção Ar-condicionado",
    "Instalação de Ar-condicionado",
    "Conserto de Geladeira",
    "Conserto de Micro-ondas",
    "Serviço não listado",
  ]

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30",
  ]

  const unavailableTimes = {
    "2025-06-01": ["10:00", "14:30"],
    "2025-06-02": ["09:00"]
  }

  const isWeekday = (dateStr) => {
    const day = new Date(dateStr).getDay()
    return day >= 1 && day <= 5
  }

  const isTimeAvailable = (dateStr, timeStr) => {
    const blocked = unavailableTimes[dateStr] || []
    return !blocked.includes(timeStr)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Nome é obrigatório"
    if (!phone.trim()) newErrors.phone = "Telefone é obrigatório"
    if (!service) newErrors.service = "Serviço é obrigatório"
    if (!date) newErrors.date = "Data é obrigatória"
    if (!time) newErrors.time = "Horário é obrigatório"

    if (
      phone &&
      !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone)
    ) {
      newErrors.phone = "Formato de telefone inválido"
    }

    if (date) {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.date = "Data não pode ser no passado"
      }
      if (!isWeekday(date)) {
        newErrors.date = "Agendamentos são permitidos apenas de segunda a sexta"
      }
    }

    if (date && time && !isTimeAvailable(date, time)) {
      newErrors.time = "Este horário já está ocupado. Escolha outro."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const formatMessage = () => {
    return `Olá! 👋\n\nMeu nome é *${name}* e gostaria de agendar um serviço.\n\n📋 *Detalhes do Agendamento:*\n• Serviço: ${service}\n• Data: ${formatDate(date)}\n• Horário: ${time}\n• Telefone: ${phone}\n\n${note ? `📝 *Observações:*\n${note}` : ""}\n\nAguardo confirmação! 😊`
  }

  const getWhatsappLink = () => {
    if (!validateForm()) return "#"
    const message = encodeURIComponent(formatMessage())
    const phoneNumber = "5547996564441"
    return `https://wa.me/${phoneNumber}?text=${message}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      window.open(getWhatsappLink(), "_blank", "noopener,noreferrer")
    }
  }

  const resetForm = () => {
    setName("")
    setPhone("")
    setService("")
    setDate("")
    setTime("")
    setNote("")
    setErrors({})
  }

  const isFormValid =
    name.trim() &&
    phone.trim() &&
    service &&
    date &&
    time &&
    Object.keys(errors).length === 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* restante da UI permanece igual */}
    </div>
  )
}
