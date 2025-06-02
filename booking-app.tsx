"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Phone, Clock, Wrench, MessageCircle, User } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Appointment {
  id: string
  date: string
  time: string
  name: string
  phone: string
  service: string
  observations?: string
}

const services = [
  "Instalação de Ar Condicionado",
  "Manutenção de Ar Condicionado",
  "Reparo de Ar Condicionado",
  "Conserto de Micro-ondas",
]

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

export default function ServiceScheduling() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    observations: "",
  })

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [availableSlots, setAvailableSlots] = useState<string[]>([])

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem("appointments")
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments))
    }
  }, [])

  // Update available slots when date changes
  useEffect(() => {
    if (formData.date) {
      const bookedSlots = appointments.filter((apt) => apt.date === formData.date).map((apt) => apt.time)

      setAvailableSlots(timeSlots.filter((slot) => !bookedSlots.includes(slot)))
    } else {
      setAvailableSlots(timeSlots)
    }
  }, [formData.date, appointments])

  const isWeekday = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDay()
    return day >= 1 && day <= 5 // Monday = 1, Friday = 5
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Reset time when date changes
    if (field === "date") {
      setFormData((prev) => ({
        ...prev,
        time: "",
      }))
    }
  }

  const isFormValid = () => {
    return (
      formData.name && formData.phone && formData.date && formData.time && formData.service && isWeekday(formData.date)
    )
  }

  const handleSubmit = () => {
    if (!isFormValid()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Check if slot is still available
    const isSlotTaken = appointments.some((apt) => apt.date === formData.date && apt.time === formData.time)

    if (isSlotTaken) {
      toast({
        title: "Horário indisponível",
        description: "Este horário já foi agendado. Por favor, escolha outro.",
        variant: "destructive",
      })
      return
    }

    // Create new appointment
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date: formData.date,
      time: formData.time,
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      observations: formData.observations,
    }

    // Save to state and localStorage
    const updatedAppointments = [...appointments, newAppointment]
    setAppointments(updatedAppointments)
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments))

    // Generate WhatsApp message
    const message =
      `*Agendamento de Serviço*\n\n` +
      `📅 *Data:* ${new Date(formData.date).toLocaleDateString("pt-BR")}\n` +
      `🕐 *Horário:* ${formData.time}\n` +
      `👤 *Nome:* ${formData.name}\n` +
      `📞 *Telefone:* ${formData.phone}\n` +
      `🔧 *Serviço:* ${formData.service}\n` +
      `${formData.observations ? `📝 *Observações:* ${formData.observations}\n` : ""}\n` +
      `Gostaria de confirmar este agendamento.`

    const whatsappUrl = `https://wa.me/5547999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Reset form
    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      service: "",
      observations: "",
    })

    toast({
      title: "Agendamento realizado!",
      description: "Você será redirecionado para o WhatsApp.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-50 to-teal-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-8 rounded-t-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Agendamento de Serviço</h1>
          </div>
          <p className="text-center text-blue-100 text-lg">Preencha os dados para agendar via WhatsApp.</p>
        </div>

        <Card className="rounded-t-none shadow-xl">
          <CardContent className="p-8">
            {/* Illustration */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-48 h-32 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Wrench className="h-16 w-16 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-blue-600 font-medium">Técnico Especializado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Nome Completo */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-12 text-lg"
                />
              </div>

              {/* Telefone e Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-lg font-semibold flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="(47) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-12 text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Data (Segunda a Sexta)
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    min={getMinDate()}
                    value={formData.date}
                    onChange={(e) => {
                      const selectedDate = e.target.value
                      if (isWeekday(selectedDate)) {
                        handleInputChange("date", selectedDate)
                      } else {
                        toast({
                          title: "Data inválida",
                          description: "Atendemos apenas de segunda a sexta-feira.",
                          variant: "destructive",
                        })
                      }
                    }}
                    className="h-12 text-lg"
                  />
                </div>
              </div>

              {/* Horário */}
              <div className="space-y-2">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horário
                </Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => handleInputChange("time", value)}
                  disabled={!formData.date || !isWeekday(formData.date)}
                >
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                    {availableSlots.length === 0 && formData.date && (
                      <SelectItem value="" disabled>
                        Nenhum horário disponível
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Serviço Desejado */}
              <div className="space-y-2">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Serviço Desejado
                </Label>
                <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Observações */}
              <div className="space-y-2">
                <Label htmlFor="observations" className="text-lg font-semibold flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Observações (Opcional)
                </Label>
                <Textarea
                  id="observations"
                  placeholder="Alguma observação especial?"
                  value={formData.observations}
                  onChange={(e) => handleInputChange("observations", e.target.value)}
                  className="min-h-[100px] text-lg"
                />
              </div>

              {/* WhatsApp Button */}
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                  className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="h-6 w-6 mr-2" />
                  {isFormValid()
                    ? "Formulário preenchido! Clique no botão abaixo para enviar via WhatsApp."
                    : "Preencha todos os campos para continuar"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Summary */}
        {appointments.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Agendamentos Realizados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {appointments.slice(-5).map((apt) => (
                  <div key={apt.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">{apt.name}</span>
                    <span className="text-sm text-gray-600">
                      {new Date(apt.date).toLocaleDateString("pt-BR")} às {apt.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
