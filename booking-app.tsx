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
  ]

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  ]

  const isWeekday = (dateStr) => {
    const day = new Date(dateStr).getDay()
    return day >= 1 && day <= 5
  }

  const validateForm = () => {
    const newErrors = {}

    if (!name.trim()) newErrors.name = "Nome é obrigatório"
    if (!phone.trim()) newErrors.phone = "Telefone é obrigatório"
    if (!service) newErrors.service = "Serviço é obrigatório"
    if (!date) newErrors.date = "Data é obrigatória"
    if (!time) newErrors.time = "Horário é obrigatório"

    const plainPhone = phone.replace(/\D/g, "")
    if (phone && (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(phone) && !/^\d{10,11}$/.test(plainPhone))) {
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
        newErrors.date = "Escolha uma data entre segunda e sexta-feira"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length < 10) return value
    return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
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
    return `Olá! 👋

Meu nome é *${name}* e gostaria de agendar um serviço.

📋 *Detalhes do Agendamento:*
• Serviço: ${service}
• Data: ${formatDate(date)}
• Horário: ${time}
• Telefone: ${phone}

${note ? `📝 *Observações:*\n${note}` : ""}

Aguardo confirmação! 😊`
  }

  const getWhatsappLink = () => {
    if (!validateForm()) return "#"
    const message = encodeURIComponent(formatMessage())
    const phoneNumber = "5547996960063"
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
    window.scrollTo(0, 0)
  }

  const isFormValid = name && phone && service && date && time && Object.keys(errors).length === 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Calendar className="h-6 w-6" />
              Agendamento de Serviço
            </CardTitle>
            <p className="text-green-100">Preencha os dados para agendar via WhatsApp</p>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome completo"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(47) 4002-8922"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Serviço Desejado
                </Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className={errors.service ? "border-red-500" : ""}>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Data
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className={errors.date ? "border-red-500" : ""}
                  />
                  {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Horário
                  </Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className={errors.time ? "border-red-500" : ""}>
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
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" disabled={!isFormValid}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Enviar WhatsApp
                </Button>

                <Button type="button" variant="outline" onClick={resetForm} className="px-4">
                  Limpar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>📱 Você será redirecionado para o WhatsApp</p>
        </div>
      </div>
    </div>
  )
}

