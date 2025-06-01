"use client"

import { useState } from "react"
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

  const isFormValid = name && phone && service && date && time && Object.keys(errors).length === 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-lg mx-auto sm:px-8">
        <Card className="shadow-xl rounded-xl">
          <CardHeader className="text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-xl drop-shadow">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Calendar className="h-6 w-6" />
              Agendamento de Serviço
            </CardTitle>
            <p className="text-green-100">Preencha os dados para agendar via WhatsApp</p>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Nome Completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome completo"
                  className={`py-2 px-3 shadow-sm ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Telefone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(47) 99999-9999"
                  className={`py-2 px-3 shadow-sm ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Serviço Desejado <span className="text-red-500">*</span>
                </Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className={`shadow-sm ${errors.service ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((serviceOption) => (
                      <SelectItem key={serviceOption} value={serviceOption}>
                        {serviceOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && <p className="text-sm text-red-500">{errors.service}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Data <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className={`shadow-sm ${errors.date ? "border-red-500" : ""}`}
                  />
                  {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Horário <span className="text-red-500">*</span>
                  </Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className={`shadow-sm ${errors.time ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((timeSlot) => (
                        <SelectItem key={timeSlot} value={timeSlot}>
                          {timeSlot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Observações (Opcional)</Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Alguma observação especial?"
                  rows={3}
                  className="py-2 px-3 shadow-sm"
                />
              </div>

              {isFormValid && (
                <Alert className="bg-green-50 border-green-200">
                  <MessageCircle className="h-4 w-4" />
                  <AlertDescription>
                    Formulário preenchido! Clique no botão abaixo para enviar via WhatsApp.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50"
                        disabled={!isFormValid}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Enviar WhatsApp
                      </Button>
                    </TooltipTrigger>
                    {!isFormValid && (
                      <TooltipContent>
                        Preencha todos os campos obrigatórios corretamente
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>

                <Button type="button" variant="outline" onClick={resetForm} className="px-4">
                  Limpar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
          <MessageCircle className="w-4 h-4" />
          Você será redirecionado para o WhatsApp
        </div>
      </div>
    </div>
  )
}
