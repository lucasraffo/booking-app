import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Clock, MessageCircle, Phone, User, Briefcase, MapPin } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BookingApp() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
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

  const validateForm = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Nome é obrigatório"
    if (!phone.trim()) newErrors.phone = "Telefone é obrigatório"
    if (!address.trim()) newErrors.address = "Endereço é obrigatório"
    if (!service) newErrors.service = "Serviço é obrigatório"
    if (!date) newErrors.date = "Data é obrigatória"
    if (!time) newErrors.time = "Horário é obrigatório"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    const message = encodeURIComponent(
      `Olá! Meu nome é *${name}* e gostaria de agendar um serviço.\n\n` +
      `📍 *Endereço:* ${address}\n📋 *Serviço:* ${service}\n📅 *Data:* ${date}\n⏰ *Horário:* ${time}\n📞 *Telefone:* ${phone}\n` +
      (note ? `📝 *Observações:* ${note}` : "") +
      `\n\nAguardo confirmação.`
    )
    const phoneNumber = "5547996960063"
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
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
